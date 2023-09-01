import Link from "./Link.tsx";

type Props = {
  creator: {
    login: string;
    url: string;
    avatarUrl: string;
  };
};
export default function Creator(props: Props) {
  return (
    <div class="flex flex-wrap gap-3">
      <div class="h-10 w-10">
        <img
          class="h-full w-full rounded-full object-cover object-center ring ring-white"
          src={props.creator.avatarUrl}
          alt=""
        />
      </div>
      <div>
        <div class="text-sm font-medium text-secondary-500">
          <Link href={props.creator.url} text={props.creator.login} />
        </div>
      </div>
    </div>
  );
}
