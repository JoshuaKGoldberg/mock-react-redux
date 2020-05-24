describe("connect", () => {
  it("throws an error when mock-redux has been imported", async () => {
    await import("mock-redux");
    const { connect } = await import("react-redux");

    expect(connect).toThrowError("connect is not supported when using mock-redux.");
  });
});
