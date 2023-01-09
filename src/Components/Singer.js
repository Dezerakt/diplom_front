import React, {useEffect, useState} from 'react';
import Layout from "../Assets/Layout";
import axios from "axios";
import {useParams} from "react-router-dom";

function Singer(props) {
    const [singerInfo, setSingerInfo] = useState(null);
    const back_url = process.env.REACT_APP_BACK_URL
    let { singer_id } = useParams();

    useEffect(() => {
        return () => {
            axios.get(back_url + "/api/singer/" + singer_id)
                .then(response => {
                    setSingerInfo(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        };
    }, []);


    return (
        <Layout>
            {singerInfo}
        </Layout>
    );
}

export default Singer;