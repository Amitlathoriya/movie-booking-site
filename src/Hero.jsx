const products = [
    {
      id: 1,
      name: 'Hacked',
      href: '#',
      price: '$48',
      imageSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Hacked_film_poster.jpg',
      imageAlt: 'Hacked',
    },
    {
      id: 2,
      name: 'Sanam Re',
      href: '#',
      price: '$35',
      imageSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Sanam_Re_movie_poster.jpg',
      imageAlt: 'Sanam Re',
    },
    {
      id: 3,
      name: 'Thugs',
      href: '#',
      price: '$89',
      imageSrc: 'https://upload.wikimedia.org/wikipedia/en/6/64/Thugs_Tamil_film_poster.jpg',
      imageAlt: 'Thugs',
    },
    {
      id: 4,
      name: 'Baby John',
      href: '#',
      price: '$35',
      imageSrc: 'https://upload.wikimedia.org/wikipedia/en/2/29/Baby_John_%28title_card%29.jpg',
      imageAlt: 'Baby John',
    },
    // More products...
  ]
  
  export default function Hero() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
  
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <a key={product.id} href={product.href} className="group" >
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                />
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }