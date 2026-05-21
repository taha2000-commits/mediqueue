declare global {
  interface String {
    capitalize(): string;
  }
}

String.prototype.capitalize = function () {
  if (!this.length) return this.toString();

  return this.charAt(0).toUpperCase() + this.slice(1);
};

export {};
