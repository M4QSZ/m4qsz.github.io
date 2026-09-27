// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "OfflineOutbox",
    products: [.library(name: "OfflineOutbox", targets: ["OfflineOutbox"])],
    targets: [
        .target(name: "OfflineOutbox"),
        .testTarget(name: "OfflineOutboxTests", dependencies: ["OfflineOutbox"])
    ]
)
