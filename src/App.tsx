import './App.css'
import {useEffect, useRef, useState} from "react";
import {SplitScreen} from "./SplitScreen.tsx";
import {RegularList} from "./lists/RegularList.tsx";
import {SmallPersonListItem} from "./people/SmallPersonListItem.tsx";
import {UserInfo} from "./people/UserInfo.tsx";
import {people, products} from "./list-items.ts";
import {ProductInfo} from "./products/ProductInfo.tsx";
import {UncontrolledModal} from "./modals/UncontrolledModal.tsx";
import {ResourceLoader} from "./controller/ResourceLoader.tsx";
import {DataSource} from "./controller/DataSource.tsx";
import axios from "axios";
import {ControlledForm} from "./forms/ControlledForm.tsx";
import {ControlledModal} from "./modals/ControlledModal.tsx";
import {ControlledFlow} from "./flows/ControlledFlow.tsx";
import {UserInfoForm} from "./forms/UserInfoForm.tsx";
import {DangerButton, LargeButton} from "./partiallyApply.tsx";

const Main = ({dishes}) => {
    return (
        <section className="container">
            <img
                style={{height: '100px'}}
                src="./dummy_serv.jpg"
                alt="server presents dummy image"/>
            <ul>
                {dishes.map((dish) => (
                    <li key={dish.id}>{dish.title}</li>
                ))}
            </ul>
        </section>
    )
}


const dishes = [
    'Soup',
    'Salad',
    'Main Course'
]
const dishObjects = dishes.map((dish, i) => ({id: i, title: dish}))

const Header = (props) => {
    return (
        <header>
            <h2>{props.name}'s Kitchen</h2>
        </header>
    )
}

const Footer = (props) => {
    return (
        <footer>
            <p>Copyright {props.year}</p>
        </footer>
    )
}

const useInputHook = (initialValue) => {
    const [value, setValue] = useState(initialValue)
    return [
        {
            value, onChange: (e) => setValue(e.target.value)
        },
        () => setValue(initialValue)
    ]

}

const query = `
query {
  allLifts {
    name
    status
    elevationGain
  }
}
`;

const opts = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({query})
}


const Lift = ({name, elevationGain, status}) => {
    return (
        <div>
            <h4>Name: {name}</h4>
            <h5>{elevationGain} {status}</h5>
        </div>
    )
}

const LeftComponent = ({name}) => {
    return (
        <div style={{background: "grey"}}>
            <h2>{name}</h2>
            <RegularList
                items={people}
                resourceName={"person"}
                itemComponent={SmallPersonListItem}/>
        </div>
    )
};

const RightComponent = ({message}) => {
    return (
        <div style={{background: "darkgray"}}>
            <h2>{message}!</h2>
            <RegularList
                items={people}
                resourceName={"person"}
                itemComponent={UserInfo}/>
        </div>
    )
};


async function getServerData(url: string) {
    const response = await axios.get(url)
    return response.data;
}

const StepOne = ({goToNext}) => (
    <>
        <h2>Step One</h2>
        <button onClick={() => goToNext({name: "Bill"})}>Next</button>
    </>

)

const StepTwo = ({goToNext}) =>
    (
        <>
            <h2>Step Two</h2>
            <button onClick={() => goToNext({age: 30})}>Next</button>
        </>
    )


function App() {
    const [titleProps, resetTitle] = useInputHook("")
    const hexColor = useRef(null)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldShowModal, setShouldShowModal] = useState(false)
    const [onboardingData, setOnboardingData] = useState({})
    const [currentIndex, setCurrentIndex] = useState(0)


    useEffect(() => {
        setLoading(true);

        fetch(`https://snowtooth.moonhighway.com/`, opts)
            .then((res) => res.json())
            .then(setData)
            .then(() => setLoading(false))
            .catch(setError)
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <pre>{JSON.stringify(error, null, 2)}</pre>
    }
    if (!data) {
        return null;
    }

    const submit = (e) => {
        e.preventDefault();
        resetTitle();
    }

    const onNext = stepData => {
        setOnboardingData({...onboardingData, ...stepData})
        setCurrentIndex(currentIndex + 1)
    }


    return (
        <>
            <div className="App">
                <Header name='Sofiia'/>
                <Main dishes={dishObjects}/>
                <ResourceLoader resourceUrl={'http://localhost:8080/users/3'} resourceName={"user"}>
                    <UserInfo userId={3}/>
                    <ProductInfo productId={3}/>
                </ResourceLoader>
                <UserInfoForm/>

                <LargeButton text={'Large'}/>
                <DangerButton text={'Danger'}/>

                <ControlledFlow
                    currentIndex={currentIndex}
                    onNext={onNext}>
                    <StepOne/>
                    <StepTwo/>
                </ControlledFlow>

                <ControlledForm/>

                <ControlledModal
                    shouldShow={shouldShowModal}
                    onRequestClose={() => setShouldShowModal(false)}>
                    <h5>Modal Content</h5>
                </ControlledModal>
                <button onClick={() => setShouldShowModal(!shouldShowModal)}>Show Modal Here</button>

                <DataSource getData={async () => {
                    return await getServerData(`http://localhost:8080/products/2`);
                }} resourceName={"product"}>
                    <ProductInfo productId={3}/>
                </DataSource>

                <SplitScreen
                    leftWeight={1}
                    rightWeight={2}>
                    <LeftComponent name={"Billy"}/>
                    <RightComponent message={"Hello"}/>
                </SplitScreen>

                {/*<NumberedList resourceName="product"*/}
                {/*              itemComponent={SmallProductListItem}*/}
                {/*              items={products}/>*/}

                <UncontrolledModal>
                    <ProductInfo productId={products[0]}/>
                </UncontrolledModal>

                <form onSubmit={submit}>
                    <input
                        {...titleProps}
                        type="text"
                        placeholder="color title..."/>
                    <input
                        ref={hexColor}
                        type="color"/>
                    <button>Add</button>
                </form>

                {data.data.allLifts.slice(0, 2).map((lift: any) => (
                    <Lift name={lift.name}
                          elevationGain={lift.elevationGain}
                          status={lift.status}/>
                ))}


                <Footer year={new Date().getFullYear()}/>
            </div>
        </>
    )
}

export default App
