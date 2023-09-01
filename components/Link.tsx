type Props = {
  text?: string;
  href?: string;
  disabled?: boolean;
};

export default function Link(props: Props) {
  const { href = "#", text = href, disabled = false } = props;
  return (
    <a
      class="underline hover:text-gray-800 visited:text-purple-600"
      href={href}
      disabled={disabled}
    >
      {text}
    </a>
  );
}
