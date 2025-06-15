import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'ikpeaej3',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
})
