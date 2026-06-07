type LedgerIconProps = React.ComponentProps<'svg'>;

export function LedgerIcon(props: LedgerIconProps) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M28 12H4M28 20H4M6.66667 4H25.3333C26.8061 4 28 5.19391 28 6.66667V25.3333C28 26.8061 26.8061 28 25.3333 28H6.66667C5.19391 28 4 26.8061 4 25.3333V6.66667C4 5.19391 5.19391 4 6.66667 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
