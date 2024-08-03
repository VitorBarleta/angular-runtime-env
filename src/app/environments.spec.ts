describe('environments/production/environment.json', () => {
  it('should follow the correct format', async () => {
    const json = await import('../environments/production/environment.json');
    const apiUrl = json['apiUrl'];
    expect(apiUrl).toBeTruthy();
    expect(apiUrl).toBe('http://localhost:4000');
  });
});

describe('environments/development/environment.json', () => {
  it('should follow the correct format', async () => {
    const json = await import('../environments/development/environment.json');
    const apiUrl = json['apiUrl'];
    expect(apiUrl).toBeTruthy();
    expect(apiUrl).toBe('http://localhost:3000');
  });
});
