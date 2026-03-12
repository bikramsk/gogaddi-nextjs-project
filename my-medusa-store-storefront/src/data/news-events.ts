export type NewsEventItem = {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string // ISO or readable
  image: string
}

export const NEWS_AND_EVENTS: NewsEventItem[] = [
  {
    id: "ne_001",
    slug: "auto-expo-2016",
    title: "Auto Expo 2016",
    date: "2016-02-18 12:03:51",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Maruti_Suzuki_Vitara_Brezza_front.jpg/640px-Maruti_Suzuki_Vitara_Brezza_front.jpg",
    excerpt:
      "The 13th edition of the Delhi Auto Expo kicked off at the India Expo Mart (IEM) in Greater Noida on Wednesday, with brands from over 20 countries showcasing various cars, bikes and automobile trends. The first two days of the expo is open to media and business visitors and it will be open for public during February 5-9. The expo kicked off with Maruti Suzuki unveiling its new compact SUV Vitara Brezza...",
  },
  {
    id: "ne_002",
    slug: "renault-unveils-duster-facelift",
    title: "Renault unveils Duster Facelift",
    date: "2016-02-15 18:15:50",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/2018_Renault_Duster_1.5.jpg/640px-2018_Renault_Duster_1.5.jpg",
    excerpt:
      "Renault has unveiled the latest version of its best selling compact SUV the Duster at the Auto Expo 2016. The updated model brings subtle exterior tweaks, an improved cabin experience, and refreshed feature list aimed at making it more competitive in the compact SUV segment...",
  },
  {
    id: "ne_003",
    slug: "kia-picanto",
    title: "Kia Picanto",
    date: "2016-02-17 18:30:14",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/2017_Kia_Picanto_GT-Line_1.25_Front.jpg/640px-2017_Kia_Picanto_GT-Line_1.25_Front.jpg",
    excerpt:
      "Foreign automobile manufacturers have found a fool-proof way to enter and survive in booming Indian car market. The manufacturers tend to enter the market with a small car which is most popular with middle-class families, who form the backbone of India’s economy and then progress to bigger cars eventually...",
  },
  {
    id: "ne_004",
    slug: "chevrolet-sail-sedan",
    title: "Chevrolet Sail Sedan",
    date: "2016-02-22 17:01:44",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Chevrolet_Sail_sedan_front.jpg/640px-Chevrolet_Sail_sedan_front.jpg",
    excerpt:
      "General Motors comes up with a new model in the international auto market — the Chevrolet Sail. The car has already launched in China, and while there is no confirmed report on its launch in India, auto analysts speculate that it will soon be introduced. The company also introduced the sedan version of the Sail at the Beijing Motor Show 2010...",
  },
  {
    id: "ne_005",
    slug: "hyundai-new-tucson",
    title: "Hyundai New Tucson",
    date: "2016-02-18 12:02:47",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Hyundai_Tucson_2021_front.jpg/640px-Hyundai_Tucson_2021_front.jpg",
    excerpt:
      "Hyundai has been popular for its premium offerings in the Indian market. Their vehicles like the Elantra, Sonata, Tucson, Terracan have been praised for strong build quality and comfort. With the all-new Tucson, Hyundai aims to strengthen its presence in the premium segment with updated styling and improved features...",
  },
  {
    id: "ne_006",
    slug: "maruti-regina",
    title: "Maruti Regina",
    date: "2016-02-19 15:01:55",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Suzuki_Swift_2018_%28cropped%29.jpg/640px-Suzuki_Swift_2018_%28cropped%29.jpg",
    excerpt:
      "This is Suzuki’s special concept car for the 2011 Tokyo Motor Show — the Regina. Maruti and Suzuki have close relations and this is where the Regina holds importance for the Indian market. So, will we see it on Indian roads? The answer may come sooner than expected...",
  },
]

