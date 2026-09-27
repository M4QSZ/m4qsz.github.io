#pragma once

#include <cstddef>
#include <cstdint>
#include <map>
#include <optional>
#include <string>
#include <vector>

struct PendingMessage {
    std::string id;
    std::string payload;
    std::uint32_t attempts = 0;
    std::uint64_t next_attempt_ms = 0;
};

class Outbox {
public:
    explicit Outbox(std::size_t capacity);

    bool enqueue(std::string id, std::string payload);
    std::vector<PendingMessage> due(std::uint64_t now_ms) const;
    bool record_attempt(const std::string& id, std::uint64_t now_ms);
    bool acknowledge(const std::string& id);
    std::size_t size() const;

private:
    std::size_t capacity_;
    std::map<std::string, PendingMessage> pending_;
};
