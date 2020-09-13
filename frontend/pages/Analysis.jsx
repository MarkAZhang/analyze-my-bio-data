import { Component } from 'react'

import LineChart from '~/components/LineChart'
import Section from '~/core/Section'
import TEST_DATA from '~/data/test_data.csv'
import Reference from './Reference'
import cs from './analysis.css'

const REFERENCES = [
  {
    name: 'Visualizing data using t-SNE',
    url: 'https://www.google.com',
    citation: 'Maaten, L.v.d. and Hinton, G., 2008. Journal of Machine Learning Research, Vol 9(Nov), pp. 2579—2605.',
  },
  {
    name: 'Adaptive restart for accelerated gradient schemes',
    url: 'https://www.google.com',
    citation: 'O’Donoghue, B. and Candes, E., 2015. Foundations of computational mathematics, Vol 15(3), pp. 715—732. Springer. DOI: 10.1007/s10208-013-9150-3',
  },
  {
    name: 'The Nth Power of a 2x2 Matrix',
    url: 'https://www.google.com',
    citation: 'Williams, K., 1992. Mathematics Magazine, Vol 65(5), pp. 336. MAA. DOI: 10.2307/2691246',
  },
  {
    name: 'From Averaging to Acceleration, There is Only a Step-size',
    url: 'https://www.google.com',
    citation: 'Flammarion, N. and Bach, F.R., 2015. COLT, pp. 658—695.',
  },
]

type Props = {}

type State = {}

export default class Analysis extends Component<Props, State> {
  render() {
    return (
      <div className={cs.analysis}>
        <Section className={cs.body}>
          <h1>
            Test multiple patients with one COVID-19 test kit
          </h1>
          <p>
            We’ve reviewed and benchmarked several group testing algorithms
            from peer-reviewed scientific papers. Read on to see how this
            can help alleviate the current shortage in COVID-19 test kits.
          </p>
          <h2>
            Summary of results
          </h2>
          <p>
            Here, we summarize the results of our benchmarks and discuss the
            practical factors for implementing these algorithms in CLIA-certified
            testing facilities in the near future. You can also view a live demo
            of how this algorithm might interface with a testing facility or
            check out our open-source implementations of these algorithms on Github.
          </p>
          <p>
            We reviewed the following group testing algorithms:
          </p>
          <ul>
            <li>
              <b>COMP</b> - Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </li>
            <li>
              <b>DD</b> - Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </li>
            <li>
              <b>SSS</b> - Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </li>
          </ul>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
            in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur.
          </p>
          <div className={cs.vizGroup}>
            <LineChart className={cs.lineChart} data={TEST_DATA} />
            <LineChart className={cs.lineChart} data={TEST_DATA} />
            <LineChart className={cs.lineChart} data={TEST_DATA} />
          </div>
          <div className={cs.caption}>
            This is a caption for the above graphs.
          </div>
          <h2>
            Can I implement this in my lab today?
          </h2>
          <p>
            Et netus et malesuada fames ac turpis egestas sed tempus. Pulvinar
            neque laoreet suspendisse interdum consectetur. Montes nascetur
            ridiculus mus mauris vitae ultricies leo integer malesuada. Massa
            sed elementum tempus egestas. Augue lacus viverra vitae congue eu.
            Vel orci porta non pulvinar. Mi ipsum faucibus vitae aliquet nec
            ullamcorper sit amet risus. Justo donec enim diam vulputate ut pharetra.
            Diam sit amet nisl suscipit adipiscing bibendum est ultricies.
          </p>
          <p>
            Et netus et malesuada fames ac turpis egestas sed
            tempus. <a href='/analysis'>Contact us</a> to learn more.
          </p>
        </Section>
        <div className={cs.referenceBg}>
          <Section className={cs.references}>
            <div className={cs.inner}>
              <h3>
                References
              </h3>
              <ol>
                {REFERENCES.map(reference => (
                  <li>
                    <Reference {...reference} />
                  </li>
                ))}
              </ol>
            </div>
          </Section>
        </div>
      </div>
    )
  }
}
