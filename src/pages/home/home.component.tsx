import React, { useId } from 'react';
import { Link } from 'react-router-dom';
import { Ptag, ToggleComponent } from '@app/core/component';
import { TypingAnimation } from '@entities/animations/type-text/type-text.component';
import { useHome } from '@pages/home/home.props';
import { VideoPlayer } from '@root/entities';
import { hoc } from '@shared/lib';
import arrow from '@shared/ui/assets/icons/arrow.svg';
import pack from '@shared/ui/assets/icons/pack.svg';
import logo from '@shared/ui/assets/images/svg/logo-cryptonomic.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import myVideo from '@shared/ui/assets/video/banner_1.mp4';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import styles from './home.module.scss';

const Home = hoc(useHome, ({ faqData, isError, isLoading, data }) => (
  <>
    <section className={classNames(styles.container_banner)}>
      <div className={styles.banner_main}>
        <div className={styles.banner_main_block}>
          <img className={styles.pack_1} src={pack} alt='pack' />
          <img className={styles.pack_2} src={pack} alt='pack' />
          <div>
            <h1>Cryptonomic</h1>
            <Ptag defaultSize='m'>
              Project for people who look for information about cryptocurrency
              and crypto tools
            </Ptag>
          </div>
          <img
            className={styles.banner_main_block_logo}
            src={logo}
            alt='logo'
          />
        </div>
      </div>

      {!isError && !isLoading && (
        <div className={styles.container_coin_list}>
          {data.map((item: any) => (
            <Link
              to={`/coin/${item.id}`}
              key={uuidv4()}
              className={styles.container_coin_list_block}
            >
              <img src={item.image} alt='Coin IMG' loading='lazy' />
              <span>{item.symbol.toUpperCase()}</span>
            </Link>
          ))}
        </div>
      )}

      <div className={styles.banner}>
        <div className={styles.container_title_block}>
          <Ptag defaultSize='m' className={styles.title}>
            Cryptocurrency & blockchain
          </Ptag>
          <img src={arrow} alt='arrow' />
        </div>
        <div className={styles.container}>
          <div>
            <VideoPlayer src={myVideo} muted={true} />
          </div>
          <div>
            <Ptag className={styles.container_content}>
              <TypingAnimation>
                Cryptocurrencies and blockchain technologies have become a hot
                topic in the world finance and technology. Thanks to its
                decentralization and independence from traditional banks and
                state organizations, cryptocurrencies allow users to produce
                fast and secure transactions, and blockchain technology gives
                the ability to store data in a distributed database without risk
                of loss or forgery. A crypto project may include development of
                a new cryptocurrency or blockchain platform, creation
                cryptocurrency wallet, integration of cryptocurrency payments
                into existing business, development of smart contracts and much
                more another. The development of cryptocurrencies and blockchain
                technologies requires expertise in various fields, including
                programming, cryptography, economics and jurisprudence. In
                addition, the project crypto may face a number of challenges,
                including difficulties in regulation and legislative field,
                security issues and transparency, as well as high competition in
                the market cryptocurrency technologies.
              </TypingAnimation>
            </Ptag>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.container_faq_title}>
          <Ptag defaultSize='m' className={styles.title}>
            Our Working Process
          </Ptag>
        </div>
        <div className={styles.container_faq_block}>
          {faqData.map(item => (
            <ToggleComponent
              key={useId()}
              title={item.title}
              number={item.number}
              text={item.text}
            />
          ))}
        </div>
      </div>
    </section>
  </>
));

export { Home };
