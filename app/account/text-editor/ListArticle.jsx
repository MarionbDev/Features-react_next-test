export default function ListArticle({ articles }) {
  console.log("liste articles props:", articles);
  return (
    <>
      <h2>Liste des articles</h2>
      <ul>
        {articles &&
          articles.map((article) => (
            <li key={article.id}>
              <h3>{article.title}</h3>
              {/* <Image src={article.photos} alt="" width={500} height={300} /> */}
              {/* <p>{article.description} </p> */}
              <p dangerouslySetInnerHTML={{ __html: article.description }} />
              <p> Prix{article.price} € </p>
            </li>
          ))}
      </ul>
    </>
  );
}
