import React, {useEffect, useState} from 'react';
import axios from "axios";
import Layout from "../Assets/Layout";
import {Card, Carousel, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function Main(props) {
    const [newAlbums, setNewAlbums] = useState([])
    const [allAlbums, setAllAlbums] = useState([]);

    const back_url = process.env.REACT_APP_BACK_URL
    useEffect(() => {
        axios.post(back_url + '/api/album/get-few', {
            album_ids:[
                "13","3","6"
            ]
        })
            .then(promise => {
                setNewAlbums(promise.data)
            })
            .catch(error => {
                console.log(error)
            })

        axios.post(back_url + '/api/album/get-few', {
            album_ids:[
                "1","2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
            ]
        })
            .then(promise => {
                setAllAlbums(promise.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    return (
        <Layout>
            <h1>Recently added</h1>

            <Carousel
                style={{
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
                                <Link to={'/album/' + album.ID}>
                                    <Container>
                                        <Row>
                                            <Col>

                                                <div
                                                    className={'album-cover'}
                                                    style={{
                                                        backgroundSize: "contain",
                                                        backgroundImage: `url("${album.image_url}")`,
                                                        zIndex: 2,
                                                        margin: '20% 0 0 50px',
                                                        width: '450px',
                                                        height: '450px',
                                                    }}/>

                                            </Col>
                                            <Col>
                                                <div
                                                    style={{
                                                        marginTop: '150px'
                                                    }}
                                                    className={'newalbums-textblock'}
                                                >
                                                    <div style={{
                                                        fontSize: '80px'
                                                    }}>{album.name}</div>
                                                    <div style={{
                                                        fontSize: '50px'
                                                    }}>{album.singer_name}</div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Link>
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
                <h1>Top Of The Week</h1>
                <Row md={6}>
                    {
                        allAlbums.map(album => {
                            return (

                                <Col
                                    key={album.ID + '-' + album.name + '-col'}>
                                    <Link to={'/album/' + album.ID}>
                                        <Card className={"card-custom-class"}>
                                            <Card.Img variant="top" src={album.image_url}/>
                                            <Card.Body>
                                                <Card.Title style={{color: 'black'}}>{album.name}</Card.Title>
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
                <Row style={{
                    marginTop: '50px'
                }}>
                    <Col lg={5}></Col>
                    <Col><Link to={'/catalog'}><h2>Check out our catalog!</h2></Link></Col>
                </Row>
            </Container>
            <br/>
            <br/>
            <br/>

        </Layout>

    );
}

export default Main;