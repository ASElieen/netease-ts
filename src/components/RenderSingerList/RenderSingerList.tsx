import React from 'react'
import {List,ListItem} from './renderStyle'

type Singers = {
    picUrl:string,
    name:string,
    accountId:number
}

interface SingerListProps {
    singerList:Array<Singers>
}

const RenderSingerList:React.FC<SingerListProps> = (props) => {
    const {singerList} = props
  return (
    <List>
        {
            singerList.map((item,index)=>(
                <ListItem key={item.accountId+''+index}>
                    <div className='img_wrapper'>
                        <img src={`${item.picUrl}?param=300x300`} width='100%' height='100%' alt="singerDetail" />
                    </div>
                    <span className='name'>{item.name}</span>
                </ListItem>
            ))
        }
    </List>
  )
}

export default React.memo(RenderSingerList);