type PlusIconProps = React.ComponentProps<'svg'>;

export function PlusIcon(props: PlusIconProps) {
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
        d="M6.66602 16.0003H25.3327M15.9993 6.66699V25.3337"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
