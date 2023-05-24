export class vSession {
  
  private storage: Storage;

  constructor() {
    this.storage = window.sessionStorage;
  }

  public set(key: string, value: any) {
    const sitringValue = JSON.stringify(value);
    this.storage.setItem(key, sitringValue);
  }

  public get(key: string): any {
    const value = this.storage.getItem(key)
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}

export default new vSession()