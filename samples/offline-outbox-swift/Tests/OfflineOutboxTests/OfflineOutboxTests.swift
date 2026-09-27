import XCTest
@testable import OfflineOutbox

final class OfflineOutboxTests: XCTestCase {
    func testKeepsOperationsWhenDisconnected() {
        var outbox = OfflineOutbox()
        XCTAssertTrue(outbox.enqueue(.init(id: "1", payload: "table updated")))
        XCTAssertTrue(outbox.plan(localAvailable: false, internetAvailable: false).isEmpty)
        XCTAssertEqual(outbox.pending.count, 1)
    }

    func testPrefersLocalRouteAndFallsBackToRemote() {
        var outbox = OfflineOutbox()
        outbox.enqueue(.init(id: "1", payload: "table updated"))
        XCTAssertEqual(outbox.plan(localAvailable: true, internetAvailable: true).first?.route, .local)
        XCTAssertEqual(outbox.plan(localAvailable: false, internetAvailable: true).first?.route, .remote)
    }

    func testAcknowledgmentAndDuplicateIds() {
        var outbox = OfflineOutbox()
        XCTAssertTrue(outbox.enqueue(.init(id: "1", payload: "first")))
        XCTAssertFalse(outbox.enqueue(.init(id: "1", payload: "duplicate")))
        XCTAssertFalse(outbox.enqueue(.init(id: "", payload: "invalid")))
        XCTAssertTrue(outbox.acknowledge(id: "1"))
        XCTAssertFalse(outbox.acknowledge(id: "1"))
        XCTAssertTrue(outbox.pending.isEmpty)
    }
}
