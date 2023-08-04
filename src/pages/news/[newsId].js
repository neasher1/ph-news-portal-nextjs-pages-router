import RootLayout from "@/components/Layouts/RootLayout";
import { Col, Row } from "antd";
import Image from "next/image";
import {
    ArrowRightOutlined,
    CalendarOutlined,
    CommentOutlined,
    ProfileOutlined,
} from "@ant-design/icons";
import { useGetNewsesByIdQuery } from "@/redux/api/api";
import { useRouter } from "next/router";

const NewsDetailsPage = () => {
    const router = useRouter();
    const id = router.query.newsId;

    const {
        data: news,
        isFetching,
        isLoading,
    } = useGetNewsesByIdQuery(id, {
        pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: false,
    })
    return (
        <div style={{ margin: "20px" }}>
            <Row
                gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                }}
            >
                <Col className="gutter-row" span={12}>
                    <Image
                        src={news?.image_url}
                        width={500}
                        height={300}
                        responsive
                        alt="news image"
                    />
                </Col>
                <Col className="gutter-row" span={12}>
                    <div>
                        <h2 style={{ fontSize: "25px" }}>{news?.title}</h2>
                        <div
                            className="line"
                            style={{
                                height: "5px",
                                margin: "20px 0",
                                background: "#000",
                                width: "100%",
                            }}
                        ></div>

                        <p
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                color: "gray",
                                margin: "10px 0px",
                                fontSize: "12px",
                            }}
                        >
                            <span>
                                <CalendarOutlined /> {news?.release_date}
                            </span>
                            <span>
                                <CommentOutlined /> {news?.comment_count} COMMENTS
                            </span>
                            <span>
                                <ProfileOutlined /> {news?.category}
                            </span>
                        </p>

                        <p style={{ fontSize: "20px" }}>
                            {news?.description}
                        </p>
                    </div>
                </Col>
            </Row>

        </div>
    );
};

export default NewsDetailsPage;

NewsDetailsPage.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};

//SSG
// export const getStaticPaths = async () => {
//     const res = await fetch("http://localhost:5000/news")
//     const newses = await res.json();

//     const paths = newses.map((news) => ({
//         params: { newsId: news.id },
//     }))

//     return { paths, fallback: false }
// }

// export const getStaticProps = async (context) => {
//     const { params } = context;

//     const res = await fetch(`http://localhost:5000/news/${params.newsId}`);
//     const data = await res.json();
//     console.log(data);

//     return {
//         props: {
//             news: data
//         }
//     }
// }

//SSR
// export const getServerSideProps = async (context) => {
//     const { params } = context;

//     const res = await fetch(`http://localhost:5000/news/${params.newsId}`);
//     const data = await res.json();
//     console.log(data);

//     return {
//         props: {
//             news: data
//         }
//     }
// }