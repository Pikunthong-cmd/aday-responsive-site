import ColumnBodyLayout from "@/components/column/ColumnBodyLayout";
import ColumnHeroCover from "@/components/column/ColumnHeroCover";
import DetailsAndShare from "@/components/DetailsAndShare";
import RelatedPosts from "@/components/ui/RelatedPosts";
import { postsAPI } from "@/src/api/posts";

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  console.log("<<<<<", slug);

  if (!slug) return <div className="p-6">Invalid slug</div>;

  const post = await postsAPI.getPostBySlug(slug);
  console.log(post[0]);

  const imageUrl = post[0].opengraph_image.url
  const title = post[0].title.rendered


  if (!post) return <div className="p-6">Post not found</div>;

  return (
    <main>
      <ColumnHeroCover
        imageUrl={imageUrl}
        title={title}
      />
      <DetailsAndShare />

      {/* <ColumnBodyLayout blocks={columnMock.blocks} /> */}

      {/* <RelatedPosts /> */}
    </main>
  );
}
