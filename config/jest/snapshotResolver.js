module.exports = {
  // resolves from test to snapshot path
  resolveSnapshotPath: (testPath, snapshotExtension) => testPath + snapshotExtension,

  // resolves from snapshot to test path
  resolveTestPath: (snapshotFilePath, snapshotExtension) => snapshotFilePath.replace(snapshotExtension, ""),

  // Example test path, used for preflight consistency check of the implementation above
  testPathForConsistencyCheck: "src/components/example.test.tsx",
};
