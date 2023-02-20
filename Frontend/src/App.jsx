// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Result } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.less';
import Home from './components/home/Home';
import RegistrationForm from './components/register/RegisterUser';

import ProvideAuth from './auth/ProvideAuth';
import RequireAuth from './auth/RequireAuth';
import BoardAdmin from './components/BoardAdmin';
import BoardUser from './components/BoardUser';
import BookDetail from './components/book/detail/BookDetail';
import ListBook from './components/book/ListBook';
import ProvideBorrowList from './components/contexts/BorrowListProvider';
import ProvideWishList from './components/contexts/WishListProvider';

import AboutPage from './components/about/AboutPage';
import CreateBook from './components/admin/book/CreateBook';
import EditBook from './components/admin/book/EditBook';
import EbookCreate from './components/admin/ebook/EbookCreate';
import LendingManage from './components/admin/lending/LendingManage';
import ListUser from './components/admin/user/ListUser';
import BorrowList from './components/borrow/borrow-list';
import LayoutCustom from './components/layout';
import Login from './components/login/Login';
import Account from './components/user/Account';
import ProfileEdit from './components/user/edit/ProfileEdit';
import Profile from './components/user/Profile';
const App = () => {
    const navigate = useNavigate();
    return (
        <ProvideAuth>
            <ProvideWishList>
                <ProvideBorrowList>
                    <Routes>
                        <Route element={<LayoutCustom />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<RegistrationForm />} />
                            <Route path="/books" element={<ListBook />} />
                            <Route path="/books/:id" element={<BookDetail />} />
                            <Route path="/profile/:id" element={<Account />} />
                            <Route element={<RequireAuth role={['USER']} />}>
                                <Route path="/user" element={<BoardUser />} />
                                <Route path="/borrow" element={<BorrowList />} />
                            </Route>
                            <Route element={<RequireAuth role={['ADMIN']} />}>
                                <Route path="/admin" element={<BoardAdmin />} />
                                <Route path="/create-book" element={<CreateBook />} />
                                <Route path="/edit-books/:id" element={<EditBook />} />
                                <Route path="/lending/:id" element={<LendingManage />} />
                                <Route path="/users-manage" element={<ListUser />} />
                                <Route path="/ebook/new/:id" element={<EbookCreate />} />
                            </Route>
                            <Route element={<RequireAuth role={['USER', 'ADMIN']} />}>
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/profile/edit/:id" element={<ProfileEdit />} />
                            </Route>
                            <Route
                                path="*"
                                element={
                                    <Result
                                        status="404"
                                        title="404"
                                        subTitle="Sorry, the page you visited does not exist."
                                        extra={
                                            <Button type="primary" onClick={() => navigate('/')}>
                                                Back Home
                                            </Button>
                                        }
                                    />
                                }
                            />
                        </Route>
                    </Routes>
                </ProvideBorrowList>
            </ProvideWishList>
        </ProvideAuth>
    );
};

export default App;
