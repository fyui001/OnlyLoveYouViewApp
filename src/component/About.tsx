import * as React from 'react'
import {Container} from 'react-bootstrap'
import '../style/About.css'

class About extends React.Component {
  public render() {
    return (
      <div className="aboutWrapper">
        <Container>
          <h1>このサイトについて</h1>
          <p>愉快な仲間たちがDiscordで叫ぶでっかい愛(主に女性声優)をbotで計測し、mecabで形態素解析をして集計したものです。</p>
          <h1>各ソースコード</h1>
          <p>本サイトのソースコード: <a href="https://github.com/fyui001/OnlyLoveYouViewApp" target="_blank"
                           rel="noreferrer noopener">お前しかすきじゃない</a></p>
          <p>愛を計測してるbot: <a href="https://github.com/fyui001/onlyLoveYou" target="_blank"
                          rel="noreferrer noopener">お前しか好きじゃないbot</a></p>
          <p>叩いてるAPI: <a href="https://github.com/fyui001/myApp" target="_blank" rel="noreferrer noopener">API</a></p>
        </Container>
      </div>
    )
  }
}

export default About
