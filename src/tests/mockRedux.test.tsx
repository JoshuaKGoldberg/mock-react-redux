describe("mockRedux", () => {
  it("throws an error when required after react-redux", async () => {
    await import("react-redux");
    const { mockRedux } = await import("mock-redux");

    expect(mockRedux).toThrowError(
      "It looks like you imported react-redux before mock-redux. Put mock-redux before react-redux or any imports that include react-redux.",
    );
  });
});
