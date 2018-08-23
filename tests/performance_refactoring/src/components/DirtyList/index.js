import React from 'react';
import Buys from 'components/Buys';
import Sells from 'components/Sells';
import './dirtyList.css';

const DirtyList = ({ orderbook }) => {
  const { buys, sells } = orderbook;

  /**
   * key 값 부여 - 리액트에서 Array를 렌더링할 때 필요한 값.
   * map 메서드 parameter에 있는 index 값을 키값을 사용할 경우 단순 경고만 감출뿐 성능상으로 key가 없는 것과 같은 결과를 보여주었습니다.
   * 대신 데이터 안에 있는 고유값(Unique id) 값을 key값으로 설정해주었습니다.
   * 고유값으로 인해서 무언가 변화가 감지되면 기존 DOM은 그대로 유지되고 변화가 필요한 DOM에만 업데이트가 발생합니다.
   */
  const buyList = buys
    .sort((a, b) => a.data[0] - b.data[0])
    .map(list => <Buys key={list.id} buyArr={list.data} />);
  const sellList = sells
    .sort((a, b) => a.data[0] - b.data[0])
    .map(list => <Sells key={list.id} sellArr={list.data} />);

  return (
    <section className="Dirty__Container">
      <aside className="Dirty__Sub">
        <div className="Dirty__Flex">{buyList}</div>
        <div className="Dirty__Flex">{sellList}</div>
      </aside>
    </section>
  );
};

export default DirtyList;
