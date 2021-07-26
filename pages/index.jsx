import { useState } from 'react'
import Head from 'next/head'
import 'antd/dist/antd.css'
import styles from '../styles/Home.module.css'

import { Card, Space, Row, Col, Input, Button, Carousel, Image, Typography } from 'antd'
const { Search } = Input
const { Text } = Typography 

export default function Home(props) {
  const [searchInput, setSearchInput] = useState()
  const [pendingImgSearch, setPendingImgSearch] = useState()
  const [imgSearchResults, setImgSearchResults] = useState()

  const onSearchInputEntered = async () => {
    setPendingImgSearch(true)

    // TODO(@robertlombardo) - this just mocks an API response from the local mock set
    await new Promise(resolve => {
      setTimeout(() => {
        const mockResults = MOCK_IMG_DATA_SET.filter(({ tags }) => tags.includes(searchInput))
        shuffleArray(mockResults)

        setImgSearchResults(mockResults)
        resolve()
      }, 500)
    })

    setPendingImgSearch(false)
  }

  const carouselContent = imgSearchResults || props.defaultImgSearchResults

  return (
    <div>
      <Head>
        <title>RRD Image Gallery | Wow, hire this Rob guy!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div className={styles.content}>
          <Card title="Rob's Razzle Dazzle Image Gallery" style={{ width: 900 }} headStyle={{ fontSize: 36, textAlign: 'center' }}>
            <Row>
              <Col span={12}>
                <Search
                  placeholder="Search images..."
                  loading={pendingImgSearch}
                  enterButton
                  onChange={e => setSearchInput(e.target.value)}
                  onSearch={onSearchInputEntered}
                />
              </Col>
              <Col span={12} style={{textAlign: 'right'}}>
                <Button type="primary" disabled>UPLOAD</Button>
              </Col>
            </Row>
            <div style={{ marginTop: '6px' }}>
              <Text italic>
                Try searching by tags such as <b>hire this guy</b>,  <b>winning</b>, or <b>robert</b>
              </Text>
            </div>
            <br />
            <div className={styles.carousel_wrapper}>
              <Carousel style={{ maxWidth: '100%' }} dots={{ className: styles.carousel_dots }}>
                {carouselContent.length
                  ? carouselContent.map(({ imgUrl }, i) => (
                    <div key={i} className={styles.image_wrapper}>
                      <Image height={460} width="auto" style={{ maxWidth: '100%' }} src={imgUrl} alt={imgUrl} />
                    </div>
                  ))
                  : (
                    <div className={styles.image_wrapper}>
                      <div style={{ color: 'orange' }}>No results found.</div>
                    </div>
                  )
                }
              </Carousel>
            </div>
          </Card>
        </div>
    </div>
  )
}

export async function getStaticProps() {
  const defaultImgSearchResults = MOCK_IMG_DATA_SET.filter(({ tags }) => tags.includes('hire this guy'))
  shuffleArray(defaultImgSearchResults)

  return {
    props: { defaultImgSearchResults }
  }
}

const MOCK_IMG_DATA_SET = [
  { imgUrl: 'https://i.imgur.com/TBfgUrq.png', tags: ['hire this guy'] },
  { imgUrl: 'https://i.imgflip.com/1qz6f2.jpg', tags: ['hire this guy'] },
  { imgUrl: 'https://memegenerator.net/img/instances/52999294.jpg', tags: ['hire this guy'] },
  { imgUrl: 'https://memegenerator.net/img/instances/76498884.jpg', tags: ['hire this guy'] },
  { imgUrl: 'https://res.cloudinary.com/jerrick/image/upload/f_jpg,fl_progressive,q_auto,w_1024/609c4d04a0c320001d90f203.jpg', tags: ['winning']},
  { imgUrl: 'https://thumbs.dreamstime.com/b/winning-team-gold-trophy-cup-against-shining-sun-sky-195189086.jpg', tags: ['winning'] },
  { imgUrl: 'https://memegenerator.net/img/instances/68644729.jpg', tags: ['winning'] },
  { imgUrl: 'https://external-preview.redd.it/2hcOA6XcEDs4lLfNYrCO_LDItsEKRm49dWxdlOLPJso.jpg?auto=webp&s=3d6c16791dba940a1f33f0ca0108088f76ba6335', tags: ['robert'] },
  { imgUrl: 'https://due.com/wp-content/uploads/2015/08/Dont-let-the-fear-of-losing-be-greater-than-the-excitement-of-winning.-%E2%80%93-Robert-Kiyosaki.jpg', tags: ['winning', 'robert' ]},
  { imgUrl: 'https://images.librarywala.com/book/medium/the%20robert%20half.jpg', tags: ['hire this guy', 'robert' ]}
]

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
