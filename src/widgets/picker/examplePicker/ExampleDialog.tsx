// import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
// import { StyleSheet, View } from 'react-native';
// import { MARGIN_V } from "../../common/dimens";
// import { commonStyles } from "../../common/styles";
// import { sortCollections } from '../../helpers';
// import { useGenderMap } from '../../hooks/enumHooks';
// import labels from "../../i18n/labels";
// import titles from "../../i18n/titles";
// import Dialog, { DialogButtonFooter, DialogTitleHeader } from "../dialog/Dialog";
// import SelectionList from "../selections/SelectionList";
// import { EnumEntry } from '../../types/modelTypes';

// export type GenderDialogPros = {
//     visible: boolean,
//     multiple?: boolean,
//     selections?: string[] | null | undefined,
//     onDismiss: () => void,
//     onSelect: (selections: string[] | null | undefined) => void,
// }
// const GenderDialog = memo((props: GenderDialogPros) => {
//     const {
//         visible,
//         selections,
//         onDismiss,
//         multiple = false,
//         onSelect
//     } = props;
//     const [currentSelections, setCurrentSelections] = useState<string[] | null | undefined>(selections);

//     const _genderMap = useGenderMap();
//     const _data = useMemo(() => {
//         if (_genderMap) {
//             return sortCollections(_genderMap.toIndexedSeq().toArray(), 'sortValue');
//         }
//         return null;
//     }, [_genderMap]);

//     const _onNextButtonPress = useCallback(() => {
//         onSelect && onSelect(currentSelections);
//     }, [onSelect, currentSelections]);
//     const _onChangeSelections = useCallback((_selectionKeys) => {
//         setCurrentSelections(_selectionKeys)
//     }, []);
//     const _getItemKey = useCallback((_item: EnumEntry) => {
//         return _item.value;
//     }, []);
//     const _getItemLabel = useCallback((_item: EnumEntry) => {
//         return _item.label;
//     }, []);
//     useEffect(() => {
//         if (visible) {
//             setCurrentSelections(selections);
//         } else {
//             setCurrentSelections(null);
//         }
//     }, [visible]);
//     let _maintenanceList;
//     if (visible) {
//         _maintenanceList = (<SelectionList
//             style={styles.listContainer}
//             rowContainerStyle={styles.rowContainer}
//             labelNumberOfLines={2}
//             selections={currentSelections}
//             multiple={multiple}
//             data={_data}
//             getItemKey={_getItemKey}
//             getItemLabel={_getItemLabel}
//             rowHeight={40}
//             onChangeSelections={_onChangeSelections}
//         />)
//     } else {
//         _maintenanceList = (<View
//             style={commonStyles.fullFlexStretchItems}
//         />)
//     }
//     return (<Dialog
//         contentContainerStyle={styles.contentContainerStyle}
//         visible={visible}
//         onDismiss={onDismiss}
//     >
//         <DialogTitleHeader
//             style={styles.headerContainer}
//             title={titles.gender}
//             onCloseButtonPress={onDismiss}
//         />
//         {_maintenanceList}
//         <DialogButtonFooter
//             style={[commonStyles.shadow5, styles.footerContainer]}
//             buttonLabel={labels.continue}
//             onPress={_onNextButtonPress}
//         />
//     </Dialog>)
// });
// const styles = StyleSheet.create({
//     contentContainerStyle: {
//         minHeight: 250,
//         alignItems: 'stretch',
//         paddingHorizontal: 0,
//         paddingBottom: 0,
//     },
//     headerContainer: {
//         marginHorizontal: 27,
//     },
//     footerContainer: {
//         backgroundColor: 'white',
//         borderTopLeftRadius: 8,
//         borderTopRightRadius: 8,
//         borderBottomLeftRadius: 18,
//         borderBottomRightRadius: 18,
//         paddingBottom: 20,
//     },
//     searchContainer: {
//         marginVertical: MARGIN_V,
//         marginHorizontal: 27,
//     },
//     listContainer: {
//         minHeight: 'auto',
//         marginTop: 20
//     },
//     rowContainer: {
//         paddingLeft: 47,
//         paddingRight: 27
//     }
// });
// export default GenderDialog;

import React, { memo } from 'react'
import { View } from 'react-native'

const ExampleDialog = memo((props) => {
    return (
        <View/>
    )
})

export default ExampleDialog
