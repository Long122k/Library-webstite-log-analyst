import { Button, Col, message, Row, Space } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookService from '../../../services/book-service';
import { getEbookDetail } from '../../../services/ebook/ebook-create';
import CreateBookOCR from './CreateBookOCR';
import CreateBookPDF from './CreateBookPDF';
import './style.css';
const EbookCreate = () => {
    const navigate = useNavigate();
    const [createType, setCreateType] = useState();
    const [bookDetail, setBookDetail] = useState();
    const [ebookDetail, setEbookDetail] = useState(null);

    console.log(ebookDetail);
    const params = useParams();
    const getEbookInfo = async () => {
        if (!params.id) {
            navigate('/notfound');
            return;
        }
        try {
            const res = await getEbookDetail(params.id, {});
            console.log(res);
            if (res.data.length === 0) {
                setEbookDetail({ empty: true });
                return;
            }
            setEbookDetail(res.data[0]);
        } catch (error) {
            message.error('something went wrong!');
        }
    };
    const fetchBookData = async () => {
        if (!params.id) {
            navigate('/notfound');
            return;
        }
        try {
            const res = await BookService.getBookDetail(params.id);
            if (res && res.data) {
                console.log(res.data.bookInfo);
                setBookDetail(res.data.bookInfo);
            }
        } catch (error) {
            console.log(error);
            message.error('Some things went wrong');
        }
    };
    useEffect(() => {
        fetchBookData();
        getEbookInfo();
    }, [params.id]);
    return (
        <div className="container">
            {bookDetail && (
                // <div>
                //     <Image
                //         onClick={(e) => e.stopPropagation()}
                //         src={bookInfo.ImageURL}
                //         alt="avatar"
                //         style={{ width: '100%', height: '100%' }}
                //     />
                //     <h3>{bookInfo.BookName}</h3>
                // </div>
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={8} md={10} lg={10} xl={10}>
                        <div className="book-img">
                            <img src={bookDetail.ImageURL} alt="" />
                        </div>
                    </Col>
                    <Col xs={24} sm={16} md={14} lg={14} xl={14}>
                        <Space direction="vertical" size={20} style={{ margin: '0px 20px' }}>
                            <h1>{bookDetail.BookName}</h1>
                            <div className="book-info-author">
                                <b>Author:</b> {' ' + bookDetail.Author}
                            </div>
                            {bookDetail.Chapter && (
                                <div className="book-info-author">
                                    {'Series: ' +
                                        bookDetail.Series +
                                        ', Chapter: ' +
                                        bookDetail.Chapter}
                                </div>
                            )}
                            <div className="book-info-publisher">
                                <i>{'Publisher: ' + bookDetail.Publisher}</i>
                            </div>
                            <div className="book-info-publish-date">
                                <i>{moment(bookDetail.PublishedDate).format('DD-MM-YYYY')}</i>
                            </div>
                        </Space>
                    </Col>
                </Row>
            )}
            {ebookDetail && ebookDetail['empty'] && (
                <>
                    {!createType ? (
                        <div className="center-div-with-space ">
                            <Button
                                type="primary"
                                size="large"
                                onClick={() => setCreateType('ocr')}>
                                Create ORC
                            </Button>
                            <Button
                                size="large"
                                type="primary"
                                style={{ backgroundColor: 'green' }}
                                onClick={() => setCreateType('pdf')}>
                                Upload PDF
                            </Button>
                        </div>
                    ) : (
                        <div style={{ width: '100%', textAlign: 'center', padding: '30px' }}>
                            {createType == 'pdf' ? (
                                <CreateBookPDF bookID={params.id} getEbookInfo={getEbookInfo} />
                            ) : (
                                <CreateBookOCR bookID={params.id} />
                            )}
                        </div>
                    )}
                </>
            )}
            {ebookDetail && !ebookDetail['empty'] && (
                <CreateBookPDF ebookDetail={ebookDetail} getEbookInfo={getEbookInfo} />
            )}
        </div>
    );
};
export default EbookCreate;
