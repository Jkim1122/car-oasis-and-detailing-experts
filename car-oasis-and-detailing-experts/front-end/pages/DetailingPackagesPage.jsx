import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useOutletContext } from "react-router-dom"
import { useEffect, useState } from 'react'
import { api } from '../src/utilities';
import DetailingPackageCard from '../components/DetailingPackagesCard';

const DetailingPackagesPage = () => {
    const {detailingPackages, setDetailingPackages} = useOutletContext()

    // const getDetailingPackages = async() => {
    //     let resp = await api.get("items/category/detailingPackage/")
    //     // console.log(resp.data)
    //     setDetailingPackages(resp.data)
    //     console.log(detailingPackages)
    // }

    // useEffect(() => {
    //     getDetailingPackages()
    // }, [])


    return (
        <>
            <h1>Detailing Packages Page</h1>
            <div className='detailing-packages'>
            {detailingPackages.map((pack, idx) => (
                <DetailingPackageCard
                key={idx}
                id={pack.pk}
                name = {pack.name}
                price = {pack.price}
                description = {pack.description}
                icon_id = {pack.icon_id}
                />
                ))
            }
            </div>
        </>
    )
}
export default DetailingPackagesPage