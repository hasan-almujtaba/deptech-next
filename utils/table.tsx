/**
 * Create column with wrapper
 * @param value Text to show
 * @param className Css class for wrapper
 * @returns Column with wrapper
 */
export const createColumn = (value: string, className: string) => {
  return <div className={className}>{value}</div>
}
