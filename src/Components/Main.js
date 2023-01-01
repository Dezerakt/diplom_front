import React, {useEffect, useState} from 'react';
import axios from "axios";
import Layout from "../Assets/Layout";
import {Card, CardGroup, Carousel, CarouselItem, Col, Container, FormText, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function Main(props) {
    const back_url = process.env.REACT_APP_BACK_URL

    const [active, setActive] = useState(false);
    const [newAlbums, setNewAlbums] = useState([])
    const [backgroundUrl, setBackgroundUrl] = useState('');

    useEffect(() => {
        return () => {
            axios.get(back_url + '/api/album/get-all', )
                .then(promise => {
                    setNewAlbums(promise.data)
                    setBackgroundUrl(promise.data[0].image_url)
                })
                .catch(error => {
                    console.log(error)
                })
        };
    }, []);

    function changeBackground(album_id){
        setBackgroundUrl(newAlbums.at(album_id).image_url)
    }

    return (
        <Layout>
            <h1>Recently added</h1>

            <Carousel
                onSlide={x => changeBackground(x)}
                style={{
                //backgroundImage: `url("${backgroundUrl}")`,
                   // backgroundColor: "red",
                    width: '100%',
                    height: '700px',
            }}>
                {
                    newAlbums.map(album => {
                        return (
                            <Carousel.Item
                                style={{
                                    width: '100%',
                                    height: '700px',
                                }}
                                key={album.ID + "-" + album.name}
                            >
                                <div
                                    style={{
                                        opacity: .75,
                                        backgroundImage: `url("${album.image_url}")`,
                                        filter: 'blur(18px)',
                                        backgroundSize: "cover",
                                        position: "absolute",
                                        width: '100%',
                                        height: '100%',
                                        zIndex: -1,
                                    }}
                                >

                                </div>
                                <div
                                    className={'album-cover'}
                                    style={{
                                        backgroundSize: "contain",
                                        backgroundImage: `url("${album.image_url}")`,
                                        zIndex: 2,
                                        margin: '7% 0 0 250px',
                                        width: '450px',
                                        height: '450px',
                                          }}/>
                                {/*<div
                                    style={{
                                        filter: 'blur(none)',
                                        width: '500px',
                                        backgroundImage: `url("${album.image_url}")`
                                    }}
                                >
                                    <Image style={{
                                        width: '500px',
                                        height: '500px'
                                    }} src={album.image_url}/>
                                </div>*/}
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>

            <Container
                fluid={true}
                style={{
                    marginTop: '25px'
                }}>
                <h1>Catalog</h1>
                <Row md={6}>
                    {
                        newAlbums.map(album => {
                            return (

                                <Col
                                    key={album.ID + '-' + album.name + '-col'}>
                                    <Link to={'/album/' + album.ID}>
                                        <Card className={"card-custom-class"}>
                                            <Card.Img variant="top" src={album.image_url} />
                                            <Card.Body>
                                                <Card.Title style={{color:'black'}}>{album.name}</Card.Title>
                                                <Card.Subtitle>
                                                    <Link to={'/singer/' + album.singer_id}>
                                                        {album.singer_name}
                                                    </Link>
                                                </Card.Subtitle>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>

                            )
                        })
                    }

                </Row>
            </Container>
        </Layout>

    );
}

export default Main;