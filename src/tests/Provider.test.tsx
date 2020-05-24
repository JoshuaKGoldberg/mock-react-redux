describe("Provider", () => {
  it("throws an error when mock-redux has been imported", async () => {
    await import("mock-redux");

    const { Provider } = await import("react-redux");

    expect(Provider).toThrowError("Provider is not supported when using mock-redux.");
  });
});
