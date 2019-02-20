let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  },{
    id: "link-1",
    description: "Prisma replaces traditional ORMs",
    url: "www.prisma.io"
  }]

let idCount = links.length;

export const Mutation = {
    // 2
    post: (parent, args) => {
       let link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    }
}