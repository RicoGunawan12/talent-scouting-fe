import React from 'react'
import { CompanyVacancyProps } from '../props/CompanyVacancyProps'

const VacancyPreviewCard: React.FC<CompanyVacancyProps> = ({ StopTime, Title, Description }) => {
    return (
        <div className='flex justify-between items-center py-2 px-2 rounded-md transition hover:cursor-pointer hover:bg-[#EFEFEF]'>
            <div>
                <div className='font-semibold'>{ Title }</div>
                <div>{ Description }</div>
            </div>

            <div>
                {/* <div>{ ApplierCount.toString() } Appliers</div> */}
            </div>
        </div>
    )
}

export default VacancyPreviewCard
