import React, {useState, useEffect} from 'react';
import Layout from "../Assets/Layout";
import {Link, useParams} from "react-router-dom";
import {Button, Col, Container, Image, ListGroup, Row, Table} from "react-bootstrap";
import axios from "axios";

function Album(props) {
    const [albums, setAlbums] = useState([]);
    const [singer, setSinger] = useState([]);
    const back_url = process.env.REACT_APP_BACK_URL;
    let {album_id} = useParams()

    useEffect(() => {
        axios.get(back_url + '/api/album/' + album_id)
            .then(response => {
                setAlbums(response.data.album)
                setSinger(response.data.singer)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    function addToCart(albumId){
        const arr = localStorage.getItem('albums') !== null ? localStorage.getItem('albums').split(',') : [];

        if(arr.find(x => x === albumId) === undefined){
            arr.push(albumId)
            localStorage.setItem('albums', arr.join(','))
        }
    }

    return (
        <Layout>
            <Container fluid={true}>
                <Row lg={24}>
                    <Col xxl={2} xl={3} lg={5} md={6}>
                        <Image src={albums.image_url}
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                        />

                    </Col>
                    <Col lg={8} sm={"auto"}>

                        <ListGroup horizontal={true}>
                            {
                                albums.images ? albums.images.map(image => {
                                    return (
                                        <ListGroup.Item>
                                            <Image style={{
                                                width: '100%',
                                                height: '150px'
                                            }} src={image.url}/>
                                        </ListGroup.Item>
                                    )
                                }) : null
                            }
                        </ListGroup>
                        <br/>
                        <Button onClick={x => addToCart(album_id)}>Add To Cart</Button>
                    </Col>
                    <Col lg={2}>
                        <Link to={'/singer/'+singer.ID}>
                        <Image style={{
                            justifyContent: "center",
                            margin: "auto",
                            width: '250px',
                            height: '250px'
                        }} src={singer.image_url}/>
                        <span>{singer.name}</span></Link>
                    </Col>
                    <Col lg={7}>
                        <Row>
                            <Col lg={4}>
                                <span>album name:</span>
                                <h1>{albums.name}</h1>
                            </Col>
                            <Col lg={2}>
                                <span>release date:</span>
                                <h3>{albums.release_date}</h3>
                            </Col>
                            <Col lg={3}>
                                <span>genre:</span>
                                <h3>{albums.genre}</h3>
                            </Col>
                        </Row>
                        <Row lg={4}>
                            <Col lg={2}>
                                <span>price:</span>
                                <h3>{albums.price + '$'}</h3>
                            </Col>
                            <Col lg={2}>
                                <span>count:</span>
                                <h3>{albums.count}</h3>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={12}>
                        <Table hover={true} style={{
                            marginTop: '15px'
                        }}>
                            <thead>
                            <tr>
                                <td><h3>Album content: </h3></td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                albums.songs ? albums.songs.map(songs => {
                                    return (
                                        <tr key={songs.ID + '-song'}>
                                            <td>
                                                {songs.name}
                                            </td>
                                        </tr>
                                    )
                                }) : null
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Album;