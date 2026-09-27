#include "outbox.hpp"

#include <algorithm>
#include <limits>
#include <stdexcept>
#include <utility>

Outbox::Outbox(std::size_t capacity) : capacity_(capacity) {
    if (capacity == 0) throw std::invalid_argument("capacity must be positive");
}

bool Outbox::enqueue(std::string id, std::string payload) {
    if (id.empty()) throw std::invalid_argument("message id must not be empty");
    if (pending_.find(id) != pending_.end() || pending_.size() >= capacity_) return false;
    auto key = id;
    pending_.emplace(std::move(key), PendingMessage{std::move(id), std::move(payload), 0, 0});
    return true;
}

std::vector<PendingMessage> Outbox::due(std::uint64_t now_ms) const {
    std::vector<PendingMessage> result;
    for (const auto& [id, message] : pending_) {
        if (message.next_attempt_ms <= now_ms) result.push_back(message);
    }
    return result;
}

bool Outbox::record_attempt(const std::string& id, std::uint64_t now_ms) {
    auto found = pending_.find(id);
    if (found == pending_.end()) return false;
    auto& message = found->second;
    if (message.attempts < std::numeric_limits<std::uint32_t>::max()) ++message.attempts;
    const auto shift = std::min(message.attempts - 1, std::uint32_t{5});
    const std::uint64_t delay_ms = std::uint64_t{1000} << shift;
    message.next_attempt_ms = now_ms > std::numeric_limits<std::uint64_t>::max() - delay_ms
        ? std::numeric_limits<std::uint64_t>::max()
        : now_ms + delay_ms;
    return true;
}

bool Outbox::acknowledge(const std::string& id) { return pending_.erase(id) != 0; }

std::size_t Outbox::size() const { return pending_.size(); }
