export enum TriggerKey {
  Alt = 'with-alt',
  Ctrl = 'with-ctrl',
  Super = 'with-super',
  Unknown = 'unknown',
}

export const toTriggerKey = (key: string): TriggerKey => {
  switch (key) {
    case 'with-alt':
      return TriggerKey.Alt;
    case 'with-ctrl':
      return TriggerKey.Ctrl;
    case 'with-super':
      return TriggerKey.Super;
    default:
      return TriggerKey.Alt;
  }
};

export const keyHolded = (key: TriggerKey, e: MouseEvent): boolean => {
  switch (key) {
    case TriggerKey.Alt:
      return e.altKey;
    case TriggerKey.Ctrl:
      return e.ctrlKey;
    case TriggerKey.Super:
      return e.metaKey;
    default:
      return e.altKey;
  }
};
