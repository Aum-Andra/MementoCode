import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";
import Image from "next/image";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticPaths() {
  let data = await client.getEntries({
    content_type: "blogPost",
  });
  return {
    paths: data.items.map((item) => ({
      params: {
        slug: item.fields.slug,
      },
    })),
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  let data = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": params.slug,
  });
  return {
    props: {
      blog: data.items[0],
    },
  };
}

const blogDetails = ({ blog }) => {
  console.log(blog);
  console.log();

  const { title, author, bBody, tags, heroImage } = blog.fields;
  return (
    <section id="blog-details">
      <div className="blog-herobox">
        <Image
          src={"http:" + heroImage.fields.file.url}
          width={heroImage.fields.file.details.image.width}
          height={heroImage.fields.file.details.image.height}
        ></Image>
        <h1 className="blog-title">{title}</h1>
      </div>
      <div className="blog-details">
        <div className="dates">
          <p className="date-nr">28</p>
          <p className="mandy">MARCH,2022</p>
          <div className="author-des">
            <p>{author.fields.name}</p>
            <Image
              className="author-img"
              src={"http:" + author.fields.image.fields.file.url}
              width="100px"
              height="100px"
            ></Image>
          </div>
        </div>
        <div className="body">{documentToReactComponents(bBody)}</div>
      </div>
    </section>
  );
};

export default blogDetails;
