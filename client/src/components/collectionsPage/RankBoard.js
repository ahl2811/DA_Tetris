import { Col, List, Row } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import '../../App.css';
import { BASE_URL } from '../../constants';
import { StyledRankBoard } from '../styles/StyledRankBoard';

const RankBoard = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(`${BASE_URL}/rank-board`);
                const data = await res.json();
                setData(data);
                console.log("getDta");
            } catch (error) {
                console.log(error);
                setData([]);
            }
        }
        getData();
    }, [props.gameOver]);

    return (
        <StyledRankBoard >
            <div className="container" style={{ height: "50vh", overflowX: "hidden" }}>
                <p className="rank-board">Rank Board</p>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    useWindow={false}
                    scrolling="true"
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <Col span={8}>
                                    <span className="rank-num"
                                        style={{
                                            color: item.rank < 4 ?
                                                item.rank < 3 ?
                                                    item.rank < 2 ?
                                                        "#faad14" : "gold" : "yellow" : "#ddd"
                                        }}
                                    >{item.rank}</span>
                                </Col>
                                <Col span={16}>
                                    <Row style={{ maxHeight: 40, fontSize: "0.8rem" }}>
                                        <span
                                            style={{
                                                color: item.rank < 4 ?
                                                    item.rank < 3 ?
                                                        item.rank < 2 ?
                                                            "#faad14" : "gold" : "yellow" : "#ddd"
                                            }}
                                        >
                                            {item.username}
                                        </span>
                                    </Row>
                                    <Row>
                                        <span className="rank-score">{item.score}</span>
                                    </Row>
                                </Col>

                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </StyledRankBoard>
    )

}

export default RankBoard;