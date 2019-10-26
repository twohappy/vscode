/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import 'vs/platform/update/common/update.config.contribution';
import { Registry } from 'vs/platform/registry/common/platform';
import { IWorkbenchContributionsRegistry, Extensions as WorkbenchExtensions } from 'vs/workbench/common/contributions';
import { IWorkbenchActionRegistry, Extensions as ActionExtensions } from 'vs/workbench/common/actions';
import { SyncActionDescriptor } from 'vs/platform/actions/common/actions';
import { ShowCurrentReleaseNotesAction, ProductContribution, UpdateContribution, CheckForVSCodeUpdateAction, CONTEXT_UPDATE_STATE } from 'vs/workbench/contrib/update/browser/update';
import { LifecyclePhase } from 'vs/platform/lifecycle/common/lifecycle';
import product from 'vs/platform/product/common/product';
import { StateType } from 'vs/platform/update/common/update';

const workbench = Registry.as<IWorkbenchContributionsRegistry>(WorkbenchExtensions.Workbench);

workbench.registerWorkbenchContribution(ProductContribution, LifecyclePhase.Restored);
workbench.registerWorkbenchContribution(UpdateContribution, LifecyclePhase.Restored);

const actionRegistry = Registry.as<IWorkbenchActionRegistry>(ActionExtensions.WorkbenchActions);

// Editor
actionRegistry
	.registerWorkbenchAction(new SyncActionDescriptor(ShowCurrentReleaseNotesAction, ShowCurrentReleaseNotesAction.ID, ShowCurrentReleaseNotesAction.LABEL), `${product.nameShort}: Show Release Notes`, product.nameShort);

actionRegistry
	.registerWorkbenchAction(new SyncActionDescriptor(CheckForVSCodeUpdateAction, CheckForVSCodeUpdateAction.ID, CheckForVSCodeUpdateAction.LABEL), `${product.nameShort}: Check for Update`, product.nameShort, CONTEXT_UPDATE_STATE.isEqualTo(StateType.Idle));
