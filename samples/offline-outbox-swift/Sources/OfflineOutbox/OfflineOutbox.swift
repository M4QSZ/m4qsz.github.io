public struct PendingOperation: Equatable {
    public let id: String
    public let payload: String

    public init(id: String, payload: String) {
        self.id = id
        self.payload = payload
    }
}

public enum Route: Equatable {
    case local
    case remote
}

public struct DeliveryPlan: Equatable {
    public let operation: PendingOperation
    public let route: Route
}

public struct OfflineOutbox {
    public private(set) var pending: [PendingOperation] = []

    public init() {}

    @discardableResult
    public mutating func enqueue(_ operation: PendingOperation) -> Bool {
        guard !operation.id.isEmpty, !pending.contains(where: { $0.id == operation.id }) else {
            return false
        }
        pending.append(operation)
        return true
    }

    @discardableResult
    public mutating func acknowledge(id: String) -> Bool {
        guard let index = pending.firstIndex(where: { $0.id == id }) else { return false }
        pending.remove(at: index)
        return true
    }

    public func plan(localAvailable: Bool, internetAvailable: Bool) -> [DeliveryPlan] {
        let route: Route
        if localAvailable {
            route = .local
        } else if internetAvailable {
            route = .remote
        } else {
            return []
        }
        return pending.map { DeliveryPlan(operation: $0, route: route) }
    }
}
