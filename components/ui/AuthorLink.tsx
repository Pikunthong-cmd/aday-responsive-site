import Link from "next/link";
import { getAuthorDetail, getAuthorHref } from "@/src/lib/author";

type Props = {
  post: any;
  label?: string;
  className?: string;
  linkClassName?: string;
  textClassName?: string;
};

export default function AuthorLink({
  post,
  label = "Host :",
  className = "",
  linkClassName = "",
  textClassName = "",
}: Props) {
  const author = getAuthorDetail(post);

  if (!author?.name) return null;

  const href = getAuthorHref(author);

  return (
    <div className={className}>
      {label ? <span className={textClassName}>{label} </span> : null}

      {href !== "#" ? (
        <Link href={href} className={linkClassName}>
          {author.name}
        </Link>
      ) : (
        <span className={linkClassName}>{author.name}</span>
      )}
    </div>
  );
}