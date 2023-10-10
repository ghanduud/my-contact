import './Home.scss';
import Table from '../components/table/Table';
import Header from '../components/header/Header';
import Side from '../components/sideSection/Side';
import NewUser from '../components/newUser/NewUser';
import EditUser from '../components/newUser/EditUser';

function Home() {
	return (
		<div className='home-container'>
			<Header />
			<Table />
			<Side />
			<NewUser />
			<EditUser />
		</div>
	);
}

export default Home;
