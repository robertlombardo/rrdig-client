import { useState } from 'react'
import Head from 'next/head'
import 'antd/dist/antd.css'
import styles from '../styles/Home.module.css'
import { gql, useMutation } from '@apollo/client'
import apolloClient from '../apollo-client'

import { Layout, Card, Space, Row, Col, Input, Button, Carousel, Image, Typography, Modal, Upload } from 'antd'
const { Content } = Layout
const { Search } = Input
const { Text } = Typography 

const getImagesQuery = gql`
query getImages($tags: [String]) {
  images(tags: $tags) {
    imgUrl
    tags
  }
}`

const uploadImageMutation = gql`
mutation ($file: Upload!, $tags: [String!]!) {
  uploadImage(file: $file, tags: $tags) {
    filename
    mimetype
    encoding
  }
}`

export default function Home(props) {
  const [searchInput, setSearchInput] = useState()
  const [pendingImgSearch, setPendingImgSearch] = useState()
  const [imgSearchResults, setImgSearchResults] = useState()
  const [showUploadModal, setShowUploadModal] = useState()
  const [fileList, setFileList] = useState()
  const [uploadMutation, what_is_this] = useMutation(uploadImageMutation)

  const onSearchInputEntered = async () => {
    setPendingImgSearch(true)

    const { data } = await apolloClient
      .query({
        query: getImagesQuery,
          variables: {
            tags: [searchInput]
          }
      })

    setImgSearchResults(data.images)
    setPendingImgSearch(false)
  }

  const carouselContent = imgSearchResults || props.defaultImgSearchResults || []


  const uploadProps = {
    listType: 'picture',
    beforeUpload: file => {
      const isImg = file.type.startsWith('image')

      if (!isImg) {
        message.error(`${file.name} is not an image file`);
      }
      return isImg ? true : Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      setFileList(info.fileList)
    }
  };

  const uploadImages = async () => {
    for (const { originFileObj } of fileList) {
      const uploadedFile = await uploadMutation({
        variables: {
          file: originFileObj,
          tags: ['potato']
        }
      })
    }
    setShowUploadModal(false)
  }

  return (
    <div>
      <Head>
        <title>RRD Image Gallery | Wow, hire this Rob guy!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Content className={styles.content}>
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
                <Button type="primary" onClick={setShowUploadModal.bind(null, true)}>UPLOAD</Button>
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
        </Content>
      </Layout>
      <Modal
        title="Upload an Image"
        visible={showUploadModal}
        onCancel={setShowUploadModal.bind(null, false)}
        onOk={uploadImages}
      >
        <Upload {...uploadProps}>
          <Button>Select image file(s) to upload</Button>
        </Upload>
      </Modal>
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await apolloClient
    .query({
      query: getImagesQuery,
        variables: {
          tags: ['hire this guy']
        }
    })

  const defaultImgSearchResults = data.images

  return {
    props: { defaultImgSearchResults }
  }
}
