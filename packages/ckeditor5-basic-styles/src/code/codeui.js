/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module basic-styles/code/codeui
 */

import { Plugin } from '@ckeditor/ckeditor5-core/core';
import { ButtonView } from '@ckeditor/ckeditor5-ui/ui';

import codeIcon from '../../theme/icons/code.svg';

import '../../theme/code.css';

const CODE = 'code';

/**
 * The code UI feature. It introduces the Code button.
 *
 * @extends module:core/plugin~Plugin
 */
export default class CodeUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const t = editor.t;

		// Add code button to feature components.
		editor.ui.componentFactory.add( CODE, locale => {
			const command = editor.commands.get( CODE );
			const view = new ButtonView( locale );

			view.set( {
				label: t( 'Code' ),
				icon: codeIcon,
				tooltip: true,
				isToggleable: true
			} );

			view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

			// Execute command.
			this.listenTo( view, 'execute', () => {
				editor.execute( CODE );
				editor.editing.view.focus();
			} );

			return view;
		} );
	}
}
