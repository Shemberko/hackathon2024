import React from "react";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import "./card.css";
import RequestCard from "./RequestCard";
import RequestSkeleton from "./RequestSkeleton";
import RequestFilter from "../../components/requests_filter";
const url = process.env.REACT_APP_API + "/api/v1/requests";


function Request(props) {
    
    const [requests, setRequests] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [tags, setTags] = useState([])
    const [all_tags, setAllTags] = useState([])
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setIsFetching(false);
                const {data} = await get_tags(url, props.filter? props.filter : {});
                console.log(data);
                setRequests(data.requests);
                setAllTags(data.all_tags)
                setTags(data.tags)
                setIsFetching(true);
            } catch (err) {
                alert("Щось пішло не так попробуйте щераз!")
                console.log(err)
            }
        }

        fetchRequests();
    }, []);

    return (
        <div className="container mb-5">
            <h3 className="my-5 fw-bold">Requests</h3>
            {isFetching ? (
                <div className="cards-inner justify-content-center">
                    <RequestFilter initialTags={tags} onTagClick ={filter}  All_tags={all_tags} />
                    {   

                        requests.map((item) => (
                            <RequestCard key={item.title} {...item}/>
                        ))
                    }
                </div>
                ) : (
                [...Array(6)].map((_, id) => (
                    <RequestSkeleton key={id}/>
                ))
            )}
        </div>
    );

    async function filter(tags){
        let {data} =   await get_tags(url,{tags: tags})
        
        setRequests(data.requests);
        setAllTags(data.all_tags)
        setTags(data.tags)
        setIsFetching(true);
    }
    async function get_tags(url,filter = {}){
        const response = await axios.get(url, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            params: {
              tags: filter.tags? filter.tags : [],
              id: filter.id
            }
          }).catch((err) => err.response);
          

      console.log("response", response);
      return response;
    }
}

export default Request;
