import { Item } from '@/store';

export const originDataForFirstTable: Item[] = [
  {
    key: '1',
    risk: 'Степень огнестойкости',
    criterion: [
      { id: '1', value: '1, 2', sum: 0 },
      { id: '2', value: '3', sum: 1 },
      { id: '3', value: '4, 5', sum: 3 },
    ],
    indicatorValue: 0,
  },
  {
    key: '2',
    risk: 'Высота здания, сооружения',
    criterion: [
      { id: '4', value: 'до 28 м', sum: 0 },
      { id: '5', value: 'от 28м до 50м (до 75 м для жилых зданий', sum: 2 },
      { id: '6', value: 'свыше 50 м(свыше 75 м для жилых зданий', sum: 4 },
    ],
    indicatorValue: 0,
  },
  {
    key: '3',
    risk: 'Наличие открытых лестниц и (или) многосветных пространств',
    criterion: [
      { id: '7', value: 'Да', sum: 4 },
      { id: '8', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '4',
    risk: 'Количество людей',
    criterion: [
      { id: '9', value: 'До 50', sum: 0 },
      { id: '10', value: '50 - 200', sum: 4 },
      { id: '11', value: '200 - 700', sum: 6 },
      { id: '12', value: '700 - 1000', sum: 8 },
      { id: '13', value: '1000 - 5000', sum: 12 },
      { id: '14', value: 'Свыше 5000', sum: 15 },
    ],
    indicatorValue: 0,
  },
  {
    key: '5',
    risk: 'Наличие круглосуточного пребывания или проживания маломобильных групп населения, детей дошкольного и школьного возраста, пожилых людей старше 65 лет',
    criterion: [
      { id: '15', value: 'Да', sum: 0 },
      { id: '16', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '6',
    risk: 'Нахождение в рабочее время на объекте более 10 человек, отнесенных к категории маломобильных групп населения, детей дошкольного и школьного возраста, а также пожилых людей старше 65 лет',
    criterion: [
      { id: '17', value: 'Да', sum: 20 },
      { id: '18', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '7',
    risk: 'Системы противопожарной защиты (автоматические установки пожаротушения и пожарной сигнализации, система оповещения людей о пожаре и управления эвакуацией людей, система противодымной вентиляции) смонтированы более 10 лет назад и не подвергались капитальному ремонту',
    criterion: [
      { id: '19', value: 'Да', sum: 10 },
      { id: '20', value: 'Нет или сведения отсутсвуют', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '8',
    risk: 'Наличие на объекте пожарной охраны, обеспеченной пожарно-техническим вооружением',
    criterion: [
      { id: '21', value: 'Да', sum: -15 },
      { id: '22', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '9',
    risk: 'Привлечение к охране организации, специально учрежденной для оказания охранных услуг, зарегистрированной в установленном законом порядке и имеющей лицензию на осуществление частной охранной деятельности',
    criterion: [
      { id: '23', value: 'Нет', sum: 0 },
      { id: '24', value: 'Не круглосуточно', sum: -3 },
      { id: '25', value: 'Круглосуточно', sum: -5 },
    ],
    indicatorValue: 0,
  },
  {
    key: '10',
    risk: 'Электропроводка выполнена более 10 лет назад и не подвергалась капитальному ремонту',
    criterion: [
      { id: '26', value: 'Да', sum: 5 },
      { id: '27', value: 'Нет или сведения отсутсвуют', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '11',
    risk: 'Вид электропроводки (за исключением зданий и сооружений Ѵ степени огнестойкости)',
    criterion: [
      { id: '28', value: 'Скрытая', sum: 0 },
      { id: '29', value: 'Открытая', sum: 2 },
    ],
    indicatorValue: 0,
  },
  {
    key: '12',
    risk: ' Наличие электрического отопления (за исключением электрических котлов с контуром отопления)',
    criterion: [
      { id: '30', value: 'Да', sum: 5 },
      { id: '31', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '13',
    risk: 'Наличие печного отопления.',
    criterion: [
      { id: '32', value: 'Да', sum: 10 },
      { id: '33', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
];

export const originDataForSecondTable: Item[] = [
  {
    key: '1',
    risk: 'Наличие в отношении объекта действующего предписания органа государственного пожарного надзора, содержащего сведения об неустраненных нарушениях установленных требований, предъявляемых к путям эвакуации, зонам безопасности для маломобильных групп населения, автоматическим системам противопожарной защиты (автоматические установки пожаротушения и пожарной сигнализации, система оповещения людей о пожаре и управления эвакуацией людей, система противодымной ветиляции)',
    criterion: [
      { id: '1', value: 'Да', sum: 8 },
      { id: '2', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '2',
    risk: 'Наличие в отношении объекта действующего предписания органа государственного пожарного надзора, содержащего сведения об неустраненных нарушениях установленных требований, предъявляемых к обеспечению деятельности пожарных подразделений',
    criterion: [
      { id: '3', value: 'Да', sum: 6 },
      { id: '4', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '3',
    risk: 'Наличие в отношении объекта действующего предписания органа государственного пожарного надзора, содержащего сведения об неустраненных нарушениях установленных требований, не вошедшими в пункты 1, 2',
    criterion: [
      { id: '5', value: 'Да', sum: 2 },
      { id: '6', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '4',
    risk: 'Наличие в отношении объекта положительного заключения независимой оценки пожарного риска (аудита пожарной безопасности)',
    criterion: [
      { id: '7', value: 'Да', sum: -10 },
      { id: '8', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '5',
    risk: 'Наличие на объекте учреждений, осуществляющих экономическую деятельность, не соответствующую функциональному назначению здания',
    criterion: [
      { id: '9', value: 'Да', sum: 3 },
      { id: '10', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '6',
    risk: 'Наличие сведений о проведении на объекте перепланировки, реконструкции, капитального ремонта или технического перевооружения',
    criterion: [
      { id: '11', value: 'Да', sum: 3 },
      { id: '12', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '7',
    risk: 'Наличие доступа у органа государственного пожарного надзора к системам Видеонаблюдения объекта для проведения регулярного дистанционного мониторинга соблюдения требований пожарной безопасности',
    criterion: [
      { id: '13', value: 'Да', sum: -4 },
      { id: '14', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '8',
    risk: 'Наличие на объекте круглосуточного мониторинга работоспособности автоматических систем противопожарной защиты (автоматические установки пожаротушения и пожарной сигнализации, система оповещения людей о пожаре и управления эвакуацией людей, система противодымной вентиляции) дежурным персоналом',
    criterion: [
      { id: '15', value: 'Да', sum: -4 },
      { id: '16', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '9',
    risk: 'Наличие зарегистрированных случаев пожаров за последние 5 лет (за исключением пожаров причиной которых является умышленное уничтожение или повреждения имущества)',
    criterion: [
      { id: '17', value: 'Да', sum: 20 },
      { id: '18', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '10',
    risk: 'Наличие вступившего в законную силу постановления суда о назначении наказания В виде административного приостановления деятельности юридического лица и индивидуального предпринимателя за нарушения требований пожарной безопасности на объекте либо решения суда о приостановлении деятельности в соответствии с частью 2 статьи 1065 Гражданского кодекса Российской Федерации в течение последних 3 лет',
    criterion: [
      { id: '19', value: 'Да', sum: 30 },
      { id: '20', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '11',
    risk: 'Наличие информации о вводе в эксплуатацию, либо фактическом функционировании объекта защиты, получившего отрицательное заключение при согласовании специальных технических условий, отражающих специфику обеспечения его пожарной безопасности и содержащих комплекс необходимых инженерно-технических и организационных мероприятий по обеспечению пожарной безопасности',
    criterion: [
      { id: '21', value: 'Да', sum: 20 },
      { id: '22', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '12',
    risk: 'Непредставление в установленном порядке декларации пожарной безопасности в отношении объекта защиты, для которого законодательством Российской Федерации о градостроительной деятельности предусмотрено проведение экспертизы проектной Документации',
    criterion: [
      { id: '23', value: 'Да', sum: 5 },
      { id: '24', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '13',
    risk: 'Непредставление подконтрольным лицом в срок, установленный в предостережении о недопустимости нарушения обязательных требований, уведомления о принятии мер на объекте по обеспечению соблюдения обязательных требований законодательства в области пожарной безопасности',
    criterion: [
      { id: '25', value: 'Да', sum: 10 },
      { id: '26', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '14',
    risk: 'Наличие сведений о ненадлежащей работе при пожаре имеющихся автоматических систем противопожарной защиты',
    criterion: [
      { id: '26', value: 'Да', sum: 10 },
      { id: '27', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
  {
    key: '15',
    risk: 'Наличие сведений о приостановлении действия лицензии юридического лица',
    criterion: [
      { id: '28', value: 'Да', sum: 10 },
      { id: '29', value: 'Нет', sum: 0 },
    ],
    indicatorValue: 0,
  },
];
