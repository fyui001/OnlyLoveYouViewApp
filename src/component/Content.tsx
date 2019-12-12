import * as React from 'react'
import {Table} from 'react-bootstrap'

interface Props {
  itemList: any
}

class Content extends React.Component<Props, {}> {

  constructor(props: any) {
    super(props)
  }
  public render() {
    return (
      <div className='content'>
        <Table striped bordered hover size='sm'>
          <thead>
          <tr>
            <th>投稿者</th>
            <th>投稿内容</th>
            <th>Love</th>
            <th>サーバー</th>
            <th>投稿日</th>
          </tr>
          </thead>
          <tbody>
          {this.props.itemList.map((item: any, index: any) => {
            return (
              <tr className="content" key={index}>
                <td className="user_name">{item.UserName}</td>
                <td className="msg_content">{item.Content}</td>
                <td className="love">{item.Love}</td>
                <td className="guild">{item.Guild}</td>
                <td className="date">{item.create_at.slice(0, 9)}</td>
              </tr>
            )
          })}
          </tbody>
        </Table>
      </div>
    )

  }
}

export default Content
