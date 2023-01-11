import React, {useState, useEffect} from 'react';
import Layout from "../Assets/Layout";
import {Link, useParams} from "react-router-dom";
import {Col, Container, Image, ListGroup, Row, Table} from "react-bootstrap";
import axios from "axios";

function Album(props) {
    const [albums, setAlbums] = useState([]);
    const [singer, setSinger] = useState([]);
    const back_url = process.env.REACT_APP_BACK_URL;
    let {album_id} = useParams()
    const parser = new DOMParser()

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


    return (
        <Layout>
            <Container fluid={true}>
                <Row xs={24}>
                    <Col xs={2}>
                        <Image src={albums.image_url}
                            style={{
                                width: '250px',
                                height: '250px'
                            }}
                        />
                    </Col>
                    <Col xs={8}>
                        <span>album name:</span>
                        <h1>{albums.name}</h1>
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
                    </Col>
                    <Col xs={2}>
                        <Link to={'/singer/'+singer.ID}>
                        <Image style={{
                            justifyContent: "center",
                            margin: "auto",
                            width: '250px',
                            height: '250px'
                        }} src={singer.image_url}/>
                        <span>{singer.name}</span></Link>
                    </Col>
                    <Col xs={12}>
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