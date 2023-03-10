import React, {useEffect, useState} from 'react';
import Layout from "../Assets/Layout";
import {Button, Col, Container, Image, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

function Cart(props) {
    const [albums, setAlbums] = useState([]);
    const [user, setUser] = useState({
        id: '',
    });
    let totalPrice = 0;
    const back_url = process.env.REACT_APP_BACK_URL;
    const albumsLocalStorage = localStorage.getItem('albums') ? localStorage.getItem('albums').split(',') : [];

    useEffect(() => {
        axios.post(back_url + '/api/album/get-few', {
            album_ids: albumsLocalStorage,
        })
            .then(response => {
                setAlbums(response.data)
            })
            .catch(error => {
                console.log(error)
            })

        axios.post(back_url + '/api/auth/get-info',{
            token: localStorage.getItem("token")
        }).then(response => {
            setUser({
                id: response.data.ID,
            })
        }).catch(error => {
            console.log(error)
        })
    }, []);

    if (albums) {
        albums.map(album => {
            totalPrice += parseInt(album.price)
        })
    }

    function deleteAlbum(albumId) {
        console.log('albumId: ' + albumId)
        const newAlbumArr = [];

        albumsLocalStorage.map(albumIdArr => {
            if (albumIdArr.toString() !== albumId.toString()) {
                newAlbumArr.push(albumIdArr)
            }
        })
        console.log(newAlbumArr)
        setAlbums(albums.filter(album => album.ID !== albumId))
        localStorage.setItem('albums', newAlbumArr.join(','))
    }

    function buyAllAlbums(x){
        x.preventDefault()
        console.log(albumsLocalStorage)
        axios.post(back_url + '/api/cart/add-few', {
            album_ids: albumsLocalStorage,
            user_id: user.id
        })
            .then(response => {
                console.log(response.data)
                setAlbums([]);
                localStorage.setItem('albums', '')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Layout>
            <Container fluid={true}>
                <Row md={15}>
                    <Col md={16} style={{
                        marginTop: '20px'
                    }}>
                        <Table hover={true} horizontal={true}>
                            <thead>
                                <tr>
                                    <td>
                                        Total price: {albums ? totalPrice + '$' : 0}
                                    </td>
                                    <td>
                                        Count: {albums ? albums.length : 0}
                                    </td>
                                    <td>
                                        <Button onClick={x => buyAllAlbums(x)}>Buy all</Button>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    albums ? albums.map(album => {
                                        return (
                                            <tr key={album.id + '-album'}>
                                                <td>
                                                    <Link to={'/album/' + album.ID}>
                                                        <Image style={{
                                                            width: '80px',
                                                            height: '80px',
                                                            marginRight: '10px'
                                                        }} src={album.image_url}/>
                                                        {album.name}
                                                    </Link>
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    <Button
                                                        style={{
                                                            marginTop: '4%'
                                                        }}
                                                        onClick={() => deleteAlbum(album.ID)}>Delete</Button>
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

export default Cart;