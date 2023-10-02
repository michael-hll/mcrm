
export function trimSpaceNewLine(input: string): string {
  if(!input) return input;
  return input.replace(/\n/, '').trim();
}